import 'package:flutter/material.dart';
import '../services/home_api.dart';
import '../components/balance_card.dart';
import '../components/services_section.dart';
import '../components/transaction_card.dart';

class HomeScreen extends StatefulWidget {
  final bool isDark;
  final VoidCallback toggleTheme;

  const HomeScreen({
    super.key,
    required this.isDark,
    required this.toggleTheme,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F6FB),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              /// ================= HEADER =================
              Stack(
                clipBehavior: Clip.none,
                children: [
                  /// BACKGROUND WAVE
                  ClipPath(
                    clipper: WaveClipper(),
                    child: Container(
                      height: 315,
                      width: double.infinity,
                      padding: const EdgeInsets.only(
                        left: 20,
                        right: 20,
                        top: 18,
                      ),
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            Color(0xFF0F172A),
                            Color(0xFF2563EB),
                          ],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                      ),
                      child: SafeArea(
                        bottom: false,
                        child: Column(
                          children: [
                            /// ================= TOP ROW =================
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                /// AVATAR + TEXT
                                Row(
                                  children: [
                                    const CircleAvatar(
                                      radius: 22,
                                      backgroundImage: NetworkImage(
                                        "https://i.pravatar.cc/150?img=12",
                                      ),
                                    ),
                                    const SizedBox(width: 10),

                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: const [
                                        /// 👋 WELCOME MESSAGE
                                        Text(
                                          "Welcome back",
                                          style: TextStyle(
                                            color: Colors.white70,
                                            fontSize: 12,
                                          ),
                                        ),

    

                                        /// NAME
                                        Text(
                                          "Ekine Chukwuemeka",
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontSize: 15,
                                            fontWeight: FontWeight.w700,
                                          ),
                                        ),

                                        

                                        /// LOCATION
                                        Row(
                                          children: [
                                            Icon(
                                              Icons.location_on,
                                              size: 14,
                                              color: Colors.white70,
                                            ),
                                            SizedBox(width: 4),
                                            Text(
                                              "Lagos, Nigeria",
                                              style: TextStyle(
                                                color: Colors.white70,
                                                fontSize: 12,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),

                                /// ACTION ICONS
                                Row(
                                  children: [
                                    IconButton(
                                      icon: Icon(
                                        widget.isDark
                                            ? Icons.light_mode
                                            : Icons.dark_mode,
                                        color: Colors.white,
                                      ),
                                      onPressed: widget.toggleTheme,
                                    ),
                                    Stack(
                                      children: [
                                        IconButton(
                                          icon: const Icon(
                                            Icons.notifications_none,
                                            color: Colors.white,
                                          ),
                                          onPressed: () {},
                                        ),
                                        Positioned(
                                          right: 10,
                                          top: 10,
                                          child: Container(
                                            width: 8,
                                            height: 8,
                                            decoration: const BoxDecoration(
                                              color: Colors.red,
                                              shape: BoxShape.circle,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),

                            const SizedBox(height: 18),

                           
                          ],
                        ),
                      ),
                    ),
                  ),

                  /// ================= FLOATING BALANCE =================
                  Positioned(
                    left: 16,
                    right: 16,
                    bottom: -30,
                    child: const BalanceCard(),
                  ),
                ],
              ),

              const SizedBox(height: 55),

              /// ================= SERVICES =================
              sectionTitle("My Services"),

              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: ServicesSection(),
              ),

              const SizedBox(height: 22),

              /// ================= TRANSACTIONS =================
              sectionTitle("Recent Jobs"),

              const SizedBox(height: 10),

              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: FutureBuilder<List<Map<String, dynamic>>>(
                  future: fetchTransactions(),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState ==
                        ConnectionState.waiting) {
                      return const Padding(
                        padding: EdgeInsets.all(20),
                        child: Center(child: CircularProgressIndicator()),
                      );
                    }

                    if (snapshot.hasError) {
                      return const Text(
                        "Unable to load jobs",
                        style: TextStyle(color: Colors.red),
                      );
                    }

                    final transactions = snapshot.data ?? [];

                    return Column(
                      children: transactions
                          .map((txn) => TransactionCard(txn: txn))
                          .toList(),
                    );
                  },
                ),
              ),

              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }

  /// ================= SECTION TITLE =================
  Widget sectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w700,
            color: Color(0xFF0F172A),
          ),
        ),
      ),
    );
  }
}

/// ================= QUICK STATS WIDGET =================
class _QuickStat extends StatelessWidget {
  final String title;
  final String value;

  const _QuickStat({
    required this.title,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          title,
          style: const TextStyle(
            color: Colors.white70,
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}

/// ================= WAVE CLIPPER =================
class WaveClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = Path();

    path.lineTo(0, size.height - 40);

    var firstControlPoint = Offset(size.width / 4, size.height);
    var firstEndPoint = Offset(size.width / 2, size.height - 30);

    var secondControlPoint =
        Offset(size.width - (size.width / 4), size.height - 70);
    var secondEndPoint = Offset(size.width, size.height - 30);

    path.quadraticBezierTo(
      firstControlPoint.dx,
      firstControlPoint.dy,
      firstEndPoint.dx,
      firstEndPoint.dy,
    );

    path.quadraticBezierTo(
      secondControlPoint.dx,
      secondControlPoint.dy,
      secondEndPoint.dx,
      secondEndPoint.dy,
    );

    path.lineTo(size.width, 0);
    path.close();

    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}