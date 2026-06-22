Future<List<Map<String, dynamic>>> fetchTransactions() async {
  await Future.delayed(const Duration(seconds: 2));

  return [
    {
      'id': 'txn_001',
      'date': '2026-04-15',
      'title': 'Barbing Service',
      'subtitle': 'Home haircut for client - Ikeja',
      'category': 'Barbing',
      'amount': 5000.00,
      'type': 'income',
      'status': 'successful',
      'client': 'John Doe',
    },
    {
      'id': 'txn_002',
      'date': '2026-04-14',
      'title': 'House Cleaning',
      'subtitle': '2-bedroom apartment cleaning',
      'category': 'Cleaning',
      'amount': 8000.00,
      'type': 'income',
      'status': 'successful',
      'client': 'Sarah A.',
    },
    {
      'id': 'txn_003',
      'date': '2026-04-13',
      'title': 'Laundry Service',
      'subtitle': 'Washing & ironing clothes',
      'category': 'Laundry',
      'amount': 3000.00,
      'type': 'income',
      'status': 'successful',
      'client': 'Michael K.',
    },
    {
      'id': 'txn_004',
      'date': '2026-04-12',
      'title': 'Errand Service',
      'subtitle': 'Grocery pickup and delivery',
      'category': 'Errand',
      'amount': 2500.00,
      'type': 'income',
      'status': 'Pending',
      'client': 'Grace L.',
    },
    {
      'id': 'txn_005',
      'date': '2026-04-11',
      'title': 'Plumbing Job',
      'subtitle': 'Fix kitchen sink leakage',
      'category': 'Repair',
      'amount': 12000.00,
      'type': 'income',
      'status': 'successful',
      'client': 'David O.',
    },
    {
      'id': 'txn_006',
      'date': '2026-04-10',
      'title': 'Cancellation Fee',
      'subtitle': 'Client cancelled cleaning job',
      'category': 'Penalty',
      'amount': 1000.00,
      'type': 'income',
      'status': 'Cancelled',
      'client': 'Unknown',
    },
  ];
}

Future<List<Map<String, dynamic>>> getServices() async {
  return [
    {"title": "cleaning", "jobs_done":20},
    {"title": "cooking", "jobs_done":20},
    {"title": "laundry", "jobs_done":20},
    {"title": "errand", "jobs_done":20},
    {"title": "barbing", "jobs_done":20},
    {"title": "drummer", "jobs_done":20},
  ];
}
