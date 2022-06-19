# Py program to upload transaction data to web app
import serial
import json
import requests
import csv
def readFile(file):
    jsonArray = []
        
    with open(file, encoding='utf-8') as csvf:        
        csvReader = csv.DictReader(csvf)        
        for row in csvReader:            
            jsonArray.append(row)
    return jsonArray

    
data = readFile("transaction.txt")
res = requests.post(
    'http://localhost:5000/upload', json=data)
if res.ok:
    print("Data uploaded")
    print(data)
    ser = serial.Serial(
        port='COM55', # Port to be changed accordingly
        baudrate=9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1
    )

    ser.write(bytes(data), 'utf-8')
    ser.flush()
    print("Data uploaded")

