
# 🌡️ Real-Time Temperature Monitoring Dashboard (MERN Stack)

This is a full-stack project developed for the **GizanTech Web Development Recruitment Task – June 2025**. The application includes:

- A rate-limited REST API that provides random temperature data.
- A real-time frontend dashboard to visualize the temperature data using Chart.js.
- Performance-tested backend using autocannon and Apache JMeter.

---

## 📁 Tech Stack

- **Frontend:** React, Chart.js (`react-chartjs-2`)
- **Backend:** Node.js, Express.js
- **Rate Limiting:** express-rate-limit
- **Logging:** morgan
- **Performance Testing:** autocannon, Apache JMeter

---

## 🚀 How to Set Up and Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Robayed110/Temperature-api.git
cd temperature-api
npm init -y
npm install express cors express-rate-limit dotenv
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
```

Start the backend server:

```bash
node server.js
```

Your API will now run at:  
**http://localhost:5000/temperature**

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm install chart.js react-chartjs-2 socket.io-client
```

Create a `.env` file in `frontend/`:

```env
REACT_APP_API_URL=http://localhost:5000/temperature
```

Start the frontend app:

```bash
npm start
```

Visit: **http://localhost:3000**

You will see a real-time updating chart.

---

## 🌐 API Endpoint Details

### **GET /temperature**

Returns mock temperature data in JSON format.

#### Example Response:
```json
{
  "temperature": 34,
  "unit": "Celcius",
  "timestamp": "2025-06-15T15:38:26.289Z"
}
```

- Temperature is a random integer between 15 and 45.
- Rate-limited to **100 requests per second** (per IP).
- If exceeded, the API responds with:
```json
{
  "status": 429,
  "error": "Too many requests. Please try again later."
}
```

---

## 📊 Commands to Run Performance Tests

### ✅ Rate Limit Test (Using autocannon)
```bash
npm install -g autocannon
autocannon -c 150 -d 5 http://localhost:5000/temperature
```

Expected: You will receive some `429` responses proving rate limiting works.

---

### ✅ Load Test (Using Apache JMeter)

1. Open **Apache JMeter GUI**
2. Create a **Thread Group** with:
   - 1000 users
   - Ramp-up period: 60s
   - Loop count: 1
3. Add an **HTTP Request** to: `http://localhost:3000/`
4. Add **Summary Report** and **View Results in Table**
5. Run the test.

---

## 📌 Assumptions and Design Decisions

- Temperature is returned as an integer to match the specified API response format.
- Used `express-rate-limit` to ensure exactly 100 requests per second are allowed.
- Used `Chart.js` via `react-chartjs-2` for easy and responsive real-time charting.
- Frontend polls backend every second using `setInterval` and `axios`.

---

## 📂 Folder Structure

```
temperature-api/
├── backend/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── access.log
├── frontend/
│   ├── src/
│   │   └── components/
│   │       └── TemperatureChart.js
│   ├── .env
│   └── ...
└── README.md
```

