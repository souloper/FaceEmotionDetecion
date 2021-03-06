from flask import Flask, render_template, Response
import cv2, os
import numpy as np
import tensorflow
 
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image  
from gevent.pywsgi import WSGIServer

# Importing Flask debugging tool
# from flask_debugtoolbar import DebugToolbarExtension  

#load model  
model=load_model(
    'fer.h5')


face_haar_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')  


app = Flask(__name__)

camera = cv2.VideoCapture(0)

@app.route('/')
def base():
    return render_template('base.html')

@app.route('/terminal')
def terminal():
    return render_template('terminal.html')


def gen_frames():  # generate frame by frame from camera
    while True:
        # Capture frame by frame
        success, frame = camera.read()
        if not success:
            break
        else:
            gray_img= cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  
        
            faces_detected = face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)  
            
        
            for (x,y,w,h) in faces_detected:
                #print('WORKING')
                cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),thickness=6)  
                roi_gray=gray_img[y:y+w,x:x+h]          #cropping region of interest i.e. face area from  image  
                roi_gray=cv2.resize(roi_gray,(48,48))  
                img_pixels = image.img_to_array(roi_gray)  
                img_pixels = np.expand_dims(img_pixels, axis = 0)  
                img_pixels /= 255  
        
                #print(img_pixels.shape)
                
                predictions = model.predict(img_pixels)  
        
                #find max indexed array  
                
                max_index = np.argmax(predictions[0])  
        
                emotions = ['Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
                predicted_emotion = emotions[max_index]  
                #print(predicted_emotion)
                cv2.putText(frame, predicted_emotion, (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)  
        
            resized_img = cv2.resize(frame, (1000, 700))  
            
            ret, buffer = cv2.imencode('.jpg', frame)
            
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

# @app.route('/home/video_feed')
# def video_feed():
#     #Video streaming route. Put this in the src attribute of an img tag
#     return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/terminal/home/video_feed')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/terminal/home')
def index():
    return render_template('index.html')
    
port = os.environ.get("PORT", 8080)

if __name__ == '__main__':
#     app.run(debug=False, host="0.0.0.0", port=port)
    http_server = WSGIServer(('', 8080), app)
    http_server.serve_forever()
# app.config['SECRET_KEY'] = '303-960-994'
