import 'package:flutter/material.dart';
import '../services/home_api.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late Future<List<Map<String, dynamic>>> _transactions;

  @override
  void initState() {
    super.initState();
    _transactions = fetchTransactions();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 20, 20, 20),
      body: Column(
        children: [
          Container(
            // height: 250,
            padding: EdgeInsets.fromLTRB(15, 20, 15, 0),

            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      padding: EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(50),
                        color: Colors.white,
                      ),
                      child: Icon(Icons.person),
                    ),
                    SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "welcome back",
                          style: TextStyle(
                            color: const Color.fromARGB(179, 253, 252, 252),
                          ),
                        ),
                        Text(
                          "chukwuemeka emmanuel",
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ],
                ),

                Container(
                  padding: EdgeInsets.all(8),

                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(Icons.notifications),
                ),
              ],
            ),
          ),
          // current balance
          Container(
            height: 250,
            padding: EdgeInsets.all(25),
            // decoration: BoxDecoration(color: Colors.indigo),
            child: Column(
              children: [
                // the title and icon
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Icon(
                          Icons.wallet_rounded,
                          color: const Color.fromARGB(167, 255, 255, 255),
                        ),
                        SizedBox(width: 8),
                        Text(
                          "current balance",
                          style: TextStyle(
                            color: const Color.fromARGB(167, 255, 255, 255),
                          ),
                        ),
                        SizedBox(width: 8),
                        Icon(
                          Icons.remove_red_eye_outlined,
                          color: const Color.fromARGB(167, 255, 255, 255),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Icon(
                          Icons.arrow_drop_down,
                          color: const Color.fromARGB(167, 255, 255, 255),
                        ),
                        SizedBox(width: 8),
                        Text(
                          "USD",
                          style: TextStyle(
                            color: const Color.fromARGB(167, 255, 255, 255),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                // the amount
                SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    // border: Border.all(color: Colors.white70, width: 1.5),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    // crossAxisAlignment: CrossAxisAlignment.center,
                    // mainAxisAlignment: MainAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        "\$",
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                          color: const Color.fromARGB(200, 255, 255, 255),
                        ),
                      ),
                      Text(
                        "10,00.00",
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.w900,
                          color: const Color.fromARGB(200, 255, 255, 255),
                        ),
                      ),
                    ],
                  ),
                ),
                // the email
                SizedBox(height: 8),
                Container(
                  padding: EdgeInsets.all(10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Email",
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            "chukwuemekacodev@gmail.com",
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: const Color.fromARGB(162, 255, 255, 255),
                            ),
                          ),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Phone",
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            "+234 8127575050",
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: const Color.fromARGB(158, 255, 255, 255),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          Expanded(
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                Container(
                  height: double.infinity,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(255, 240, 239, 239),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(15),
                      topRight: Radius.circular(15),
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 40, 16, 16),
                    child: FutureBuilder<List<Map<String, dynamic>>>(
                      future: _transactions,
                      builder: (context, snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return const Center(
                            child: CircularProgressIndicator(),
                          );
                        }
                        if (snapshot.hasError) {
                          return Center(
                            child: Text('Error: ${snapshot.error}'),
                          );
                        }
                        final transactions = snapshot.data ?? [];
                        if (transactions.isEmpty) {
                          return const Center(
                            child: Text('No transactions yet.'),
                          );
                        }
                        return ListView.separated(
                          padding: EdgeInsets.only(top: 40),
                          itemCount: transactions.length,
                          separatorBuilder: (context, index) =>
                              const SizedBox(height: 8),
                          itemBuilder: (context, index) {
                            final item = transactions[index];
                            final amount = item['amount'] as num;
                            final amountColor = amount < 0
                                ? Colors.red
                                : Colors.green;

                            return Container(
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(10),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.03),
                                    blurRadius: 6,
                                    offset: const Offset(0, 3),
                                  ),
                                ],
                              ),
                              child: ListTile(
                                dense: true,
                                contentPadding: const EdgeInsets.symmetric(
                                  horizontal: 12,
                                  vertical: 8,
                                ),
                                title: Text(
                                  item['title'] ?? '',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                subtitle: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(item['subtitle'] ?? ''),
                                    const SizedBox(height: 2),
                                    Text(
                                      item['date'] ?? '',
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: Colors.grey,
                                      ),
                                    ),
                                  ],
                                ),
                                trailing: Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      '${amount < 0 ? '-' : '+'}\$${amount.abs().toStringAsFixed(2)}',
                                      style: TextStyle(
                                        color: amountColor,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    Text(
                                      item['status'] ?? '',
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: Colors.black54,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        );
                      },
                    ),
                  ),
                ),
                Positioned(
                  left: 20,
                  right: 20,
                  top: -25,
                  child: Container(
                    width: 400,
                    height: 75,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: EdgeInsets.all(10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        ...[
                          {
                            "name": "withdraw",
                            "icon": Icons.arrow_outward,
                            "color": Colors.orange,
                          },
                          {
                            "name": "history",
                            "icon": Icons.history,
                            "color": Colors.indigo,
                          },
                          {
                            "name": "requests",
                            "icon": Icons.engineering,
                            "color": Colors.red,
                          },
                        ].map(
                          (item) => Row(
                            children: [
                              Container(
                                padding: EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: (item["color"] as Color).withAlpha(90),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Icon(
                                  item["icon"] as IconData,
                                  color: const Color.fromARGB(255, 99, 98, 98),
                                ),
                              ),
                              SizedBox(width: 5),
                              Text(item["name"] as String),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
