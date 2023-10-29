{
	if ($0~/value-text/ && !($0~/data-value-text/)) {
		sub(/value-text(="[a-zA-Z* ]*")?/, "map-type=\"value-text\"")
	}
	print
}
