# run the following command to update all the SVGs to have url parameters
# ls ../apps/yapms/src/lib/assets/maps/**/*.svg | xargs gawk -f add-url-params-to-svgs.awk -i inplace

{
	cnt=split(FILENAME,path,"/");
	split(path[cnt],extension,".")
	split(extension[1],res,"-");

	if (res[4] != "") {
		sub(/<svg/, "<svg variant=\""res[4]"\"");
	}
	if (res[3] != "") {
		sub(/<svg/, "<svg date=\""res[3]"\"");
	}
	if (res[2] != "") {
		sub(/<svg/, "<svg type=\""res[2]"\"");
	}
	if (res[1] != "") {
		sub(/<svg/, "<svg map=\""res[1]"\"");
	}

	print
}
