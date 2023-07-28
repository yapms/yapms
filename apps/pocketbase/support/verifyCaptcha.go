package support

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"github.com/pocketbase/pocketbase/core"
)

type cloudflareResponse struct {
	Success    bool     `json:"success"`
	ErrorCodes []string `json:"error-codes"`
}

func VerifyCaptcha(e *core.RecordCreateEvent, turnstileSecret *string) error {
	token := e.HttpContext.FormValue("turnstile-token")

	postBody, err := json.Marshal(map[string]string{
		"response": token,
		"secret":   *turnstileSecret,
	})

	if err != nil {
		return errors.New("Failed to create post body")
	}

	response, err := http.Post(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		"application/json",
		bytes.NewBuffer(postBody),
	)

	if err != nil {
		return errors.New("Failed to request cloudflare")
	}

	responseBody := cloudflareResponse{}
	err = json.NewDecoder(response.Body).Decode(&responseBody)

	if err != nil {
		return errors.New("Failed to decode response")
	}

	if responseBody.Success == false {
		return errors.New(
			strings.Join(
				responseBody.ErrorCodes,
				"|",
			),
		)
	}

	return nil
}
