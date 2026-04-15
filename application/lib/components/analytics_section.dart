import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class FullAnalyticsSection extends StatefulWidget {
  const FullAnalyticsSection({super.key});

  @override
  State<FullAnalyticsSection> createState() => _FullAnalyticsSectionState();
}

class _FullAnalyticsSectionState extends State<FullAnalyticsSection> {
  String selected = "Weekly";

  final Map<String, List<double>> earningsData = {
    "Daily": [5, 8, 6, 10, 7, 12, 9],
    "Weekly": [50, 80, 65, 100],
    "Monthly": [200, 300, 250, 400],
  };

  @override
  Widget build(BuildContext context) {
    return Container(
      
      decoration: BoxDecoration(
        
        boxShadow: [
          BoxShadow(
            blurRadius: 15,
            color: Colors.black.withOpacity(0.05),
            offset: const Offset(0, 6),
          )
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [

          
          const SizedBox(height: 10),

          /// ================= EARNINGS CARD =================
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.grey.shade50,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Earnings Overview",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),

                const SizedBox(height: 8),

                SizedBox(
                  height: 120, // 🔥 smaller for mobile
                  child: BarChart(
                    BarChartData(
                      borderData: FlBorderData(show: false),
                      gridData: FlGridData(
                        show: true,
                        drawVerticalLine: false,
                        horizontalInterval: 50,
                        getDrawingHorizontalLine: (value) => FlLine(
                          color: Colors.grey.shade200,
                          strokeWidth: 1,
                        ),
                      ),
                      titlesData: FlTitlesData(show: false),
                      barGroups: _buildBars(),
                    ),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 14),

          /// ================= GIG CARD =================
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.grey.shade50,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Gig Performance",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),

                const SizedBox(height: 10),

                Row(
                  children: [

                    /// PIE CHART (SMALLER)
                    Expanded(
                      flex: 2,
                      child: SizedBox(
                        height: 140, // 🔥 reduced size
                        child: PieChart(
                          PieChartData(
                            centerSpaceRadius: 35,
                            sectionsSpace: 2,
                            sections: _buildPie(),
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(width: 8),

                    /// LEGEND (compact)
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _Legend(color: Colors.green, text: "Completed"),
                          _Legend(color: Colors.orange, text: "Pending"),
                          _Legend(color: Colors.red, text: "Cancelled"),
                          _Legend(color: Colors.blue, text: "Progress"),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  /// ================= BAR DATA (THICKER CANDLES) =================
  List<BarChartGroupData> _buildBars() {
    final values = earningsData[selected]!;

    return List.generate(values.length, (i) {
      return BarChartGroupData(
        x: i,
        barRods: [
          BarChartRodData(
            toY: values[i],
            width: 38, // 🔥 BIGGER CANDLE WIDTH
            borderRadius: BorderRadius.circular(6),
            color: Colors.deepOrange,
          ),
        ],
      );
    });
  }

  /// ================= PIE DATA =================
  List<PieChartSectionData> _buildPie() {
    return [
      PieChartSectionData(value: 40, color: Colors.green, radius: 40),
      PieChartSectionData(value: 25, color: Colors.orange, radius: 40),
      PieChartSectionData(value: 20, color: Colors.red, radius: 40),
      PieChartSectionData(value: 15, color: Colors.blue, radius: 40),
    ];
  }
}

/// ================= LEGEND =================
class _Legend extends StatelessWidget {
  final Color color;
  final String text;

  const _Legend({
    required this.color,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            text,
            style: const TextStyle(fontSize: 12),
          ),
        ],
      ),
    );
  }
}