import 'package:application/core/color.dart';
import 'package:application/features/home/modals/withdrawal.dart';
import 'package:flutter/material.dart';
import 'dart:math' as math;

class BalanceCard extends StatefulWidget {
  const BalanceCard({super.key});

  @override
  State<BalanceCard> createState() => _BalanceCardState();
}

class _BalanceCardState extends State<BalanceCard> {
  bool isHidden = false;
  String selectedCurrency = "NGN";

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color.fromARGB(255, 13, 18, 153), Color(0xFF0E0834)],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(50),
            blurRadius: 20,
            offset: const Offset(0, 15),
          ),
        ],
      ),
      child: Stack(
        children: [
          // 📊 BACKGROUND CHART
          Positioned.fill(child: _BackgroundChart()),

          // glow effects
          Positioned(
            top: -40,
            right: -30,
            child: _glowCircle(140, Colors.white.withOpacity(0.08)),
          ),
          Positioned(
            bottom: -60,
            left: -40,
            child: _glowCircle(180, Colors.white.withOpacity(0.05)),
          ),

          // MAIN CONTENT
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// HEADER
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Text(
                        "Current Balance",
                        style: TextStyle(
                          color: Colors.white70,
                          fontSize: 12,
                          letterSpacing: 1,
                        ),
                      ),
                      IconButton(
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(),
                        onPressed: () {
                          setState(() => isHidden = !isHidden);
                        },
                        icon: Icon(
                          isHidden ? Icons.visibility_off : Icons.visibility,
                          color: Colors.white70,
                          size: 18,
                        ),
                      ),
                    ],
                  ),

                  /// 🎯 CLEAN PROFESSIONAL DROPDOWN
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.white.withOpacity(0.2)),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: selectedCurrency,
                        dropdownColor: AppColor.accent,
                        icon: const Icon(
                          Icons.keyboard_arrow_down,
                          color: AppColor.onAccent,
                          size: 18,
                        ),
                        style: const TextStyle(
                          color: AppColor.onAccent,
                          fontWeight: FontWeight.w600,
                        ),
                        items: const [
                          DropdownMenuItem(value: "NGN", child: Text("NGN")),
                          DropdownMenuItem(value: "USD", child: Text("USD")),
                          DropdownMenuItem(value: "EUR", child: Text("EUR")),
                        ],
                        onChanged: (value) {
                          setState(() => selectedCurrency = value!);
                        },
                      ),
                    ),
                  ),
                ],
              ),

              // const SizedBox(height: 5),

              /// 💰 BALANCE
              Text(
                isHidden ? "******" : "₦24,845.50",
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 34,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 6),

              /// MINI STATS
              Row(
                children: const [
                  Expanded(
                    child: _MiniInfo(title: "Today", value: "₦2,450"),
                  ),
                  SizedBox(width: 12),
                  Expanded(
                    child: _MiniInfo(title: "Week", value: "₦12,300"),
                  ),
                ],
              ),

              const SizedBox(height: 18),

              /// ACTIONS
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFF4338CA),
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      onPressed: () => showGeneralDialog(
                        context: context,
                        pageBuilder: (context, _, _) {
                          return WithdrawalScreen();
                        },
                      ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.file_upload_outlined, size: 18),
                          SizedBox(width: 8),
                          Text("Withdraw"),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white.withOpacity(0.15),
                        elevation: 0,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.history, color: Colors.white, size: 18),
                          SizedBox(width: 8),
                          Text(
                            "History",
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
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

  Widget _glowCircle(double size, Color color) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(shape: BoxShape.circle, color: color),
    );
  }
}

/// 📊 BACKGROUND ANALYTICS CHART
class _BackgroundChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(painter: _ChartPainter());
  }
}

class _ChartPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withOpacity(0.08)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final path = Path();

    double height = size.height;
    double width = size.width;

    path.moveTo(0, height * 0.7);

    for (double x = 0; x < width; x++) {
      double y = math.sin(x * 0.02) * 20 + height * 0.6;
      path.lineTo(x, y);
    }

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// MINI INFO
class _MiniInfo extends StatelessWidget {
  final String title;
  final String value;

  const _MiniInfo({required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.08),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(color: Colors.white70, fontSize: 11),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
