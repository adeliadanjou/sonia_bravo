FROM cabify/backend-bootcamp-messageapp

WORKDIR /app
# Install any needed packages specified in requirements.txt 

COPY package.json .

# COPY app.js .

ADD . /app

RUN npm install

# El puerto donde esto funciona
EXPOSE 9001

# Run app.py when the container launches
CMD ["node", "app.js"]