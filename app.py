from flask import Flask, request
import requests
from flask_cors import CORS #comment this on deployment

headers = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko)\
   Chrome/56.0.2924.87 Safari/537.36'
}

app = Flask(__name__, static_url_path='', static_folder='frontend/public')
CORS(app) #comment this on deployment


@app.route("/pincode", methods=["POST"])
def processPincode():
    jsonObj = request.get_json()
    pincode = int(jsonObj['pincode'])
    date = jsonObj['date'][8:] + '-' + jsonObj['date'][5:7] + '-' + jsonObj['date'][:4]
    vaccine = jsonObj['vaccine']
    dose = jsonObj['dose']
    age = jsonObj['ageGroup']

    responseObj = dict()
    response = []
    print('before req')
    r = requests.get(f"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode={pincode}&date={date}", headers=headers)

    sessions = r.json()['sessions']

    for session in sessions:
        if session['available_capacity'] == 0:
            continue
        sessionObj = dict()
        
        if vaccine != 'Either' and vaccine != session['vaccine']:
            continue

        if dose != 'Both' and int(dose[-1]) == 1 and session['available_capacity_dose1'] == 0:
            continue
        if dose != 'Both' and int(dose[-1]) == 2 and session['available_capacity_dose2'] == 0:
            continue

        sessionObj['name'] = session['name']
        sessionObj['address'] = session['address']
        sessionObj['min_age_limit'] = session['min_age_limit']
        sessionObj['from'] = session['from']
        sessionObj['to'] = session['to']
        sessionObj['available_capacity_dose1'] = session['available_capacity_dose1']
        sessionObj['available_capacity_dose2'] = session['available_capacity_dose2']
        if session['fee_type'] != "Free":
            sessionObj['fee'] = session['fee']
        sessionObj['vaccine'] = session['vaccine']
        sessionObj['slots'] = str(session['slots'])

        response.append(sessionObj)

    responseObj['response'] = response
    
    return responseObj

@app.route("/district", methods=["POST"])
def processDIscrict():
    jsonObj = request.get_json()
    District_id = int(jsonObj['district'])
    date = jsonObj['date'][8:] + '-' + jsonObj['date'][5:7] + '-' + jsonObj['date'][:4]
    vaccine = jsonObj['vaccine']
    dose = jsonObj['dose']
    age = jsonObj['ageGroup']

    responseObj = dict()
    response = []
   
    r = requests.get(f'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id={District_id}&date={date}', headers=headers)

    sessions = r.json()['sessions']

    for session in sessions:
        if session['available_capacity'] == 0:
            continue
        sessionObj = dict()
        
        if vaccine != 'Either' and vaccine != session['vaccine']:
            continue

        if dose != 'Both' and int(dose[-1]) == 1 and session['available_capacity_dose1'] == 0:
            continue
        if dose != 'Both' and int(dose[-1]) == 2 and session['available_capacity_dose2'] == 0:
            continue

        sessionObj['name'] = session['name']
        sessionObj['address'] = session['address']
        sessionObj['min_age_limit'] = session['min_age_limit']
        sessionObj['from'] = session['from']
        sessionObj['to'] = session['to']
        sessionObj['available_capacity_dose1'] = session['available_capacity_dose1']
        sessionObj['available_capacity_dose2'] = session['available_capacity_dose2']
        if session['fee_type'] != "Free":
            sessionObj['fee'] = session['fee']
        sessionObj['vaccine'] = session['vaccine']
        sessionObj['slots'] = str(session['slots'])

        response.append(sessionObj)

    responseObj['response'] = response
    
    return responseObj





if __name__ == "__main__":
    app.run(debug=True)