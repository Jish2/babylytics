from fastapi import FastAPI,Request
import csv

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "hello"}

@app.post("/post/")
async def post_request(request : Request):
    body = await request.body()
    
    return body



f = open('./temp.csv', 'w')
writer = csv.writer(f)

# write a row to the csv file
writer.writerow("test")

# close the file
f.close()

