
Future<List<Map<String, dynamic>>> gigsData() async {
  await Future.delayed(const Duration(seconds: 2));
  return [
    {
      "name": "John Plumbing Expert",
      "service": "Plumbing Services",
      "price": "₦5,000",
      "online": true,
      "rating": "4.8",
      "reviews": "126",
      "distance": "3.2 km",
      "image": "https://i.pravatar.cc/150?img=3",
      "tag": "Fast Response",
    },
    {
      "name": "Bright Electrician",
      "service": "Electrical Services",
      "price": "₦4,000",
      "online": false,
      "rating": "4.9",
      "reviews": "98",
      "distance": "2.1 km",
      "image": "https://i.pravatar.cc/150?img=5",
      "tag": "Verified",
    },
    {
      "name": "Sparkle Cleaning Pro",
      "service": "Cleaning Services",
      "price": "₦3,500",
      "online": true,
      "rating": "4.7",
      "reviews": "76",
      "distance": "1.8 km",
      "image": "https://i.pravatar.cc/150?img=6",
      "tag": "Top Rated",
    },
    {
      "name": "Sparkle Cleaning Pro",
      "service": "Cleaning Services",
      "price": "₦3,500",
      "online": true,
      "rating": "4.7",
      "reviews": "76",
      "distance": "1.8 km",
      "image": "https://i.pravatar.cc/150?img=6",
      "tag": "Top Rated",
    },
    {
      "name": "Sparkle Cleaning Pro",
      "service": "Cleaning Services",
      "price": "₦3,500",
      "online": true,
      "rating": "4.7",
      "reviews": "76",
      "distance": "1.8 km",
      "image": "https://i.pravatar.cc/150?img=6",
      "tag": "Top Rated",
    },
    {
      "name": "Sparkle Cleaning Pro",
      "service": "Cleaning Services",
      "price": "₦3,500",
      "online": true,
      "rating": "4.7",
      "reviews": "76",
      "distance": "1.8 km",
      "image": "https://i.pravatar.cc/150?img=6",
      "tag": "Top Rated",
    },
  ];
}

Future<List<Map<String, dynamic>>> getMostSearch() async {
  return [
   {"service":"plumbing"},
   {"service":"cleaning"},
   {"service":"laundry"},
   {"service":"cooking"},
  ];
}
