import 'package:flutter/material.dart';

class BalanceCard extends StatefulWidget {
  const BalanceCard({super.key});

  @override
  State<BalanceCard> createState() => _BalanceCardState();
}

class _BalanceCardState extends State<BalanceCard> {
  bool isHidden = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(26),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF4F46E5),
            Color(0xFF6366F1),
            Color(0xFF4338CA),
          ],
        ),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF4F46E5).withOpacity(0.4),
            blurRadius: 30,
            offset: const Offset(0, 15),
          ),
        ],
      ),
      child: Stack(
        children: [

          /// 🎨 BACKGROUND ART (GLOW ORBS)
          Positioned(
            top: -30,
            right: -20,
            child: _glowCircle(120, Colors.white.withOpacity(0.08)),
          ),
          Positioned(
            bottom: -40,
            left: -20,
            child: _glowCircle(160, Colors.white.withOpacity(0.05)),
          ),

          /// CONTENT
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [

              /// HEADER
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [

                  const Text(
                    "Available Balance",
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 12,
                      letterSpacing: 1,
                    ),
                  ),

                  Row(
                    children: [

                      /// 👁 TOGGLE VISIBILITY
                      IconButton(
                        onPressed: () {
                          setState(() {
                            isHidden = !isHidden;
                          });
                        },
                        icon: Icon(
                          isHidden
                              ? Icons.visibility_off
                              : Icons.visibility,
                          color: Colors.white70,
                          size: 18,
                        ),
                      ),

                      const Icon(
                        Icons.account_balance_wallet_outlined,
                        color: Colors.white70,
                        size: 18,
                      ),
                    ],
                  ),
                ],
              ),

              const SizedBox(height: 8),

              /// 💰 AMOUNT
              Text(
                isHidden ? "••••••" : "₦24,845.50",
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1,
                ),
              ),

              const SizedBox(height: 6),

              const Text(
                "Earnings from completed gigs",
                style: TextStyle(
                  color: Colors.white70,
                  fontSize: 12,
                ),
              ),

              const SizedBox(height: 18),

              /// 📊 MINI STATS (MODERN STYLE)
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  _MiniInfo(title: "Today", value: "₦2,450"),
                  _MiniInfo(title: "Week", value: "₦12,300"),
                  _MiniInfo(title: "Jobs", value: "18"),
                ],
              ),

              const SizedBox(height: 20),

              /// ACTION BUTTONS (UPGRADED)
              Row(
                children: [

                  /// WITHDRAW
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFF4338CA),
                        elevation: 0,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      onPressed: () {},
                      child: const Text(
                        "Withdraw",
                        style: TextStyle(fontWeight: FontWeight.w600),
                      ),
                    ),
                  ),

                  const SizedBox(width: 10),

                  /// HISTORY (GLASS STYLE)
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: Colors.white30),
                        color: Colors.white.withOpacity(0.05),
                      ),
                      child: TextButton(
                        onPressed: () {},
                        child: const Text(
                          "History",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// 🎨 GLOW CIRCLE
  Widget _glowCircle(double size, Color color) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color,
      ),
    );
  }
}

/// MINI INFO (IMPROVED)
class _MiniInfo extends StatelessWidget {
  final String title;
  final String value;

  const _MiniInfo({
    required this.title,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            color: Colors.white70,
            fontSize: 11,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 15,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
}