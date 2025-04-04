echo "Enter the directory of images to process (three-letter country code)"
read code

magick $code/one.jpg -extent 1200x600 -gravity West $code/two.jpg -gravity East first_mask.jpg -extent 1200x600 -gravity center -composite $code/blended.jpg

echo "Compress to WebP? (y/n)"
read webp

case $webp in
  [yY])
    cwebp -q 10 $code/blended.jpg -o $code/blended.webp
    rm $code/blended.jpg
    ;;
  *)
    echo "Invalid input. Please enter 'y' or 'n'."
    # Handle invalid input, e.g., loop back to prompt or exit
    exit 1
    ;;
esac