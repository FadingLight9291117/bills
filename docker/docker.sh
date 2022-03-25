docker build -t fadinglight/bill-server:v0.2 .
docker build -t fadinglight/bill-server .
docker push fadinglight/bill-www:v0.2
docker push fadinglight/bill-server