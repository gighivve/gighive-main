Future<List<Map<String, dynamic>>> fetchTransactions() async {
  await Future.delayed(const Duration(seconds: 2));
  return [
    {
      'id': 'txn_001',
      'date': '2026-03-15',
      'title': 'Amazon Purchase',
      'subtitle': 'Electronics',
      'amount': -79.99,
      'status': 'Completed',
    },
    {
      'id': 'txn_002',
      'date': '2026-03-14',
      'title': 'Salary',
      'subtitle': 'Company Ltd',
      'amount': 2400.00,
      'status': 'Received',
    },
    {
      'id': 'txn_003',
      'date': '2026-03-13',
      'title': 'Grocery Store',
      'subtitle': 'Food & Essentials',
      'amount': -56.40,
      'status': 'Completed',
    },
    {
      'id': 'txn_004',
      'date': '2026-03-12',
      'title': 'Flight Booking',
      'subtitle': 'Travel',
      'amount': -350.00,
      'status': 'Pending',
    },
  ];
}
