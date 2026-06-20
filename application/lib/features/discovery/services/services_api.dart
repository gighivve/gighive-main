import 'dart:async';

class FakeApiService {
  static const Duration _delay = Duration(milliseconds: 900);

  /// =========================
  /// 200-WORD DESCRIPTION
  /// =========================
  static String _desc200(String service, String location, String extra) {
    return """
The $service was booked through the platform and successfully delivered in $location. The request was assigned to a verified service provider based on availability, rating, and proximity to the client.
Overall, the service was delivered successfully with verified completion and positive client experience.
""";
  }

  /// =========================
  /// REUSABLE MOCK DATA
  /// =========================
  static List<Map<String, dynamic>> _timeline(String date) => [
    {"step": 1, "title": "Booking Confirmed", "status": "done", "date": date},
    {"step": 2, "title": "Worker Assigned", "status": "done", "date": date},
    {"step": 3, "title": "In Progress", "status": "done", "date": date},
    {"step": 4, "title": "Completed", "status": "done", "date": date},
  ];

  static List<Map<String, dynamic>> _reviews(String user) => [
    {
      "user": user,
      "rating": 5,
      "comment": "Very professional service delivery.",
      "date": "2026-04-28",
    },
  ];

  static List<Map<String, dynamic>> _comments() => [
    {"from": "client", "message": "Great execution 👍", "date": "2026-04-28"},
  ];

  static List<Map<String, dynamic>> _testimonials(String name) => [
    {
      "name": name,
      "text": "Smooth and reliable service experience.",
      "rating": 5,
    },
  ];

  /// =========================
  /// SUMMARY LIST
  /// =========================
  static Future<List<Map<String, dynamic>>> fetchGigs() async {
    await Future.delayed(_delay);

    return [
      _summary("1", "Barbing Service", "Lekki", "completed", 5000),
      _summary("2", "Home Cleaning", "Ikoyi", "completed", 12000),
      _summary("3", "Laundry Service", "Yaba", "canceled", 3000),
      _summary("4", "Plumbing Repair", "Surulere", "completed", 15000),
      _summary("5", "Electrical Fix", "Ajah", "ongoing", 20000),
      _summary("6", "Painting Job", "VI", "completed", 35000),
      _summary("7", "AC Installation", "Ikeja", "ongoing", 45000),
      _summary("8", "Car Wash", "Festac", "completed", 4000),
      _summary("9", "Catering Service", "Magodo", "canceled", 60000),
      _summary("10", "Makeup Service", "Ikoyi", "completed", 25000),
    ];
  }

  static Map<String, dynamic> _summary(
    String id,
    String title,
    String location,
    String status,
    int amount,
  ) {
    return {
      "id": id,
      "title": title,
      "client": "Client $id",
      "location": location,
      "status": status,
      "amount": amount,
      "priority": "medium",
    };
  }

  /// =========================
  /// DETAIL API
  /// =========================
  static Future<Map<String, dynamic>> fetchGigDetail(String id) async {
    await Future.delayed(_delay);

    final db = <String, Map<String, dynamic>>{
      "1": _barbing(),
      "2": _cleaning(),
      "3": _laundry(),
      "4": _plumbing(),
      "5": _electrical(),
      "6": _painting(),
      "7": _ac(),
      "8": _carwash(),
      "9": _catering(),
      "10": _makeup(),
    };

    return db[id] ?? db["1"]!;
  }

  /// =========================
  /// BASE STRUCTURE
  /// =========================
  static Map<String, dynamic> _base({
    required String id,
    required String title,
    required String summary,
    required String description,
    required List timeline,
    required List reviews,
    required List comments,
    required List testimonials,
  }) {
    return {
      "id": id,
      "title": title,
      "summary": summary,
      "description": description,
      "status": "completed",

      "client": {"name": "Client $id", "phone": "08012345$id", "rating": 4.7},

      "worker": {"name": "Worker $id", "rating": 4.8, "verified": true},

      "location": {"city": "Lagos", "address": "Zone $id"},

      "schedule": {
        "date": "2026-04-2$id",
        "startTime": "10:00",
        "endTime": "11:30",
      },

      "payment": {"amount": 1000 * int.parse(id), "status": "paid"},

      "timeline": timeline,
      "reviews": reviews,
      "comments": comments,
      "testimonials": testimonials,
    };
  }

  /// =========================
  /// SERVICES (ALL FILLED)
  /// =========================

  static Map<String, dynamic> _barbing() => _base(
    id: "1",
    title: "Barbing Service",
    summary: "Premium fade haircut and beard styling.",
    description: _desc200(
      "Barbing Service",
      "Lekki, Lagos",
      "Low fade haircut with beard styling",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("John Doe"),
    comments: _comments(),
    testimonials: _testimonials("John Doe"),
  );

  static Map<String, dynamic> _cleaning() => _base(
    id: "2",
    title: "Home Cleaning",
    summary: "Deep apartment cleaning service.",
    description: _desc200(
      "Home Cleaning",
      "Ikoyi, Lagos",
      "Full apartment deep cleaning",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("Mary Johnson"),
    comments: _comments(),
    testimonials: _testimonials("Mary Johnson"),
  );

  static Map<String, dynamic> _laundry() => _base(
    id: "3",
    title: "Laundry Service",
    summary: "Wash and fold service.",
    description: _desc200(
      "Laundry Service",
      "Yaba, Lagos",
      "Clothes washing and folding",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("David Mark"),
    comments: _comments(),
    testimonials: _testimonials("David Mark"),
  );

  static Map<String, dynamic> _plumbing() => _base(
    id: "4",
    title: "Plumbing Repair",
    summary: "Leak fixing service.",
    description: _desc200(
      "Plumbing Repair",
      "Surulere, Lagos",
      "Pipe leakage and repair work",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("Samuel Peter"),
    comments: _comments(),
    testimonials: _testimonials("Samuel Peter"),
  );

  static Map<String, dynamic> _electrical() => _base(
    id: "5",
    title: "Electrical Fix",
    summary: "Wiring repair service.",
    description: _desc200(
      "Electrical Fix",
      "Ajah, Lagos",
      "Electrical fault troubleshooting",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("Chris Paul"),
    comments: _comments(),
    testimonials: _testimonials("Chris Paul"),
  );

  static Map<String, dynamic> _painting() => _base(
    id: "6",
    title: "Painting Job",
    summary: "Wall painting service.",
    description: _desc200(
      "Painting Job",
      "VI, Lagos",
      "Interior wall painting",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("Michael Ade"),
    comments: _comments(),
    testimonials: _testimonials("Michael Ade"),
  );

  static Map<String, dynamic> _ac() => _base(
    id: "7",
    title: "AC Installation",
    summary: "Air conditioner setup.",
    description: _desc200(
      "AC Installation",
      "Ikeja, Lagos",
      "AC installation and servicing",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("Daniel James"),
    comments: _comments(),
    testimonials: _testimonials("Daniel James"),
  );

  static Map<String, dynamic> _carwash() => _base(
    id: "8",
    title: "Car Wash",
    summary: "Full car cleaning.",
    description: _desc200(
      "Car Wash",
      "Festac, Lagos",
      "Interior and exterior wash",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("Victor King"),
    comments: _comments(),
    testimonials: _testimonials("Victor King"),
  );

  static Map<String, dynamic> _catering() => _base(
    id: "9",
    title: "Catering Service",
    summary: "Event food service.",
    description: _desc200(
      "Catering Service",
      "Magodo, Lagos",
      "Event catering service",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("Grace Ayo"),
    comments: _comments(),
    testimonials: _testimonials("Grace Ayo"),
  );

  static Map<String, dynamic> _makeup() => _base(
    id: "10",
    title: "Makeup Service",
    summary: "Bridal makeup glam.",
    description: _desc200(
      "Makeup Service",
      "Ikoyi, Lagos",
      "Bridal and event makeup",
    ),
    timeline: _timeline("2026-04-28"),
    reviews: _reviews("Favour Blessing"),
    comments: _comments(),
    testimonials: _testimonials("Favour Blessing"),
  );
}
