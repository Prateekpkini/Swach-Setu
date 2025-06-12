# SwachaPatha
SwachaPatha is a digital waste management system tailored for rural Gram Panchayats, addressing key challenges such as inefficient garbage collection, poor fee tracking, and manual route planning. The solution ensures optimized waste pickup, transparent data flow, and community engagement through a lightweight, scalable digital infrastructure.

⚙️ Technical Overview:

Frontend: Built with React.js, offering role-based interfaces for Waste Collectors, Supervisors, and Residents.

Backend: Developed using Node.js and Express, exposing RESTful APIs for data handling, fee tracking, and route logic.

Database: Uses MongoDB, a flexible NoSQL database ideal for handling unstructured rural household data and dynamic route logs.

Data Visualization: Integrated with Recharts for supervisor dashboards to analyze collection frequency, fee status, and route coverage.

Geo-Tracking: Designed for GPS integration to optimize waste collector paths and verify collection events.

Offline Support: Roadmap includes IndexedDB + Service Workers for offline data capture in low-connectivity areas.

User Roles & Security: Implements role-based access and data segregation for Admins, SHG Workers, and Residents.

Seeded Data: Household-level data from Aranthodu Panchayat used to simulate real operations for testing and prototyping.


🧩 Key Features:

Real-time household waste data access

Fee payment status tracking

Collector route planning and verification

Data syncing capabilities for remote/rural operation

Modular design for easy scaling across 223+ Panchayats
