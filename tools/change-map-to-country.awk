# change all map parameters to country parameters
# find ../apps/yapms/src/lib/assets/maps \! -type l | xargs awk -f change-map-to-country.awk -i inplace

{
	match($0,/map="([a-zA-Z]*)"/,data)
	sub(/map="[a-zA-Z]*"/,"country=\""data[1]"\"")
	print
}
