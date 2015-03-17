FILES=$1
for f in $FILES 
do
	echo "Analyzing directory $f"
	node scripts/getmetrics.js $f
	node scripts/mergemetrics.js
done