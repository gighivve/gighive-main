import 'package:application/features/home/modals/transactions.dart';
import 'package:application/core/color.dart';
import 'package:application/features/home/sections/qickAction._Section.dart';
import 'package:application/features/home/widgets/balance_card.dart';
import 'package:application/core/widgets/sectionTitle.dart';
import 'package:application/core/widgets/waveClip.dart';
import 'package:application/features/home/sections/services_section.dart';
import 'package:application/features/home/widgets/transaction_card.dart';
import 'package:application/features/home/services/homeApi.dart';
import 'package:application/features/home/sections/header.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  final ValueChanged<int?> onChangeTab;
  final bool isDark;
  final VoidCallback toggleTheme;

  const HomeScreen({
    super.key,
    required this.isDark,
    required this.toggleTheme,
    required this.onChangeTab,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            children: [
              /// ================= HEADER =================
              Stack(
                clipBehavior: Clip.none,
                children: [
                  ClipPath(
                    clipper: WaveClipper(),
                    child: Container(
                      height: 335,
                      width: double.infinity,
                      padding: const EdgeInsets.only(
                        left: 10,
                        right: 10,
                        top: 18,
                      ),
                      decoration: const BoxDecoration(
                        color: Color.fromARGB(255, 195, 195, 196),
                      ),
                      child: const SafeArea(bottom: false, child: HomeHeader()),
                    ),
                  ),

                  /// FLOATING BALANCE (SAFE FIX)
                  Positioned(
                    left: 10,
                    right: 10,
                    bottom: -10,
                    child: const BalanceCard(),
                  ),
                ],
              ),

              /// spacing to compensate overlap
              const SizedBox(height: 30),

              /// ================= QUICK ACTION =================
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: QickActionSection(
                  onChangeTab: (tabIndex) => widget.onChangeTab(tabIndex),
                ),
              ),

              const SizedBox(height: 20),

              /// ================= SERVICES =================
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: ServicesSection(),
              ),

              const SizedBox(height: 20),

              /// ================= RECENT JOBS =================
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        sectionTitle("transaction"),
                        GestureDetector(
                          onTap: () {
                            showGeneralDialog(
                              context: context,
                              pageBuilder: (context, _, _) {
                                return TransactionsScreen();
                              },
                            );
                          },
                          child: Text(
                            "see all",
                            style: TextStyle(color: AppColor.accent),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 10),

                    /// ================= FIXED LIST (NO OVERFLOW) =================
                    FutureBuilder<List<Map<String, dynamic>>>(
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

                        /// 🔥 FIX: replaced Column with ListView
                        return ListView.separated(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: transactions.length,
                          separatorBuilder: (_, __) =>
                              const SizedBox(height: 10),
                          itemBuilder: (context, index) {
                            return TransactionCard(txn: transactions[index]);
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }
}
