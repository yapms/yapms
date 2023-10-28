# find ../apps/yapms/src/lib/assets/maps \! -type l | xargs awk -f use-map-type-attribute.awk -i inplace

{
	if ($0~/regions/ && !($0~/svg/)) {
		sub(/regions(="[a-zA-Z* ]*")?/,"map-type=\"regions\"")
	}
	
	else if ($0~/region-texts/) {
		sub(/region-texts(="[a-zA-Z* ]*")?/,"map-type=\"region-texts\"")
	}

	else if ($0~/inset-texts/) {
		sub(/inset-texts(="[a-zA-Z* ]*")?/,"map-type=\"inset-texts\"")
	}

	else if ($0~/inset-lines/) {
		sub(/inset-lines(="[a-zA-Z* ]*")?/,"map-type=\"inset-lines\"")
	}
	
	else if ($0~/insets/) {
		sub(/insets(="[a-zA-Z* ]*")?/,"map-type=\"insets\"")
	}
	
	else if ($0~/inset-region/) {
		sub(/inset-region(="[a-zA-Z* ]*")?/,"map-type=\"inset-region\"")
	}

	print
}
