package support

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/pocketbase/pocketbase/core"
)

type cloudflareResponse struct {
	Success    bool     `json:"success"`
	ErrorCodes []string `json:"error-codes"`
}

func VerifyCaptcha(e *core.RecordCreateEvent, turnstileSecret *string) (*cloudflareResponse, error) {
	token := e.HttpContext.FormValue("turnstile-token")

	postBody, err := json.Marshal(map[string]string{
		"response": token,
		"secret":   *turnstileSecret,
	})

	if err != nil {
		return nil, errors.New("Failed to create post body")
	}

	response, err := http.Post(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		"application/json",
		bytes.NewBuffer(postBody),
	)

	if err != nil {
		return nil, errors.New("Failed to request cloudflare")
	}

	decodedResponse := cloudflareResponse{}
	err = json.NewDecoder(response.Body).Decode(&decodedResponse)

	if err != nil {
		return nil, errors.New("Failed to decode response")
	}

	return &decodedResponse, nil
}
