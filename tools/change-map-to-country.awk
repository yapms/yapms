# change all map parameters to country parameters
# ls ../apps/yapms/src/lib/assets/maps/**/*.svg | xargs gawk -f add-url-params-to-svgs.awk -i inplace

{
	match($0,/map="([a-zA-Z]*)"/,data)
	sub(/map="[a-zA-Z]*"/,"country=\""data[1]"\"")
	print
}
