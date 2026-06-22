import 'package:application/core/color.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  String selected = "Weekly";

  final Map<String, List<double>> earningsData = {
    "Daily": [5, 8, 6, 10, 7, 12, 9],
    "Weekly": [50, 80, 65, 100],
    "Monthly": [200, 300, 250, 400],
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.background,

      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text(
          "Analytics",
          style: TextStyle(
            color: AppColor.primary,
            fontWeight: FontWeight.w700,
          ),
        ),
        iconTheme: const IconThemeData(color: AppColor.primary),
      ),

      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [

              /// ================= KPI ROW 1 =================
              Row(
                children: [
                  Expanded(child: _kpi("Earnings", "₦120,450", Icons.trending_up)),
                  const SizedBox(width: 10),
                  Expanded(child: _kpi("Jobs", "48", Icons.work_outline)),
                ],
              ),

              const SizedBox(height: 10),

              /// ================= KPI ROW 2 =================
              Row(
                children: [
                  Expanded(child: _kpi("Completed", "42", Icons.check_circle_outline)),
                  const SizedBox(width: 10),
                  Expanded(child: _kpi("Rating", "4.8", Icons.star_outline)),
                ],
              ),

              const SizedBox(height: 20),

              /// ================= EARNINGS CHART =================
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppColor.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "Earnings Overview",
                          style: TextStyle(fontWeight: FontWeight.w700),
                        ),

                        DropdownButton<String>(
                          value: selected,
                          underline: const SizedBox(),
                          items: earningsData.keys.map((e) {
                            return DropdownMenuItem(
                              value: e,
                              child: Text(e),
                            );
                          }).toList(),
                          onChanged: (v) {
                            if (v == null) return;
                            setState(() => selected = v);
                          },
                        ),
                      ],
                    ),

                    const SizedBox(height: 10),

                    SizedBox(
                      height: 180,
                      child: BarChart(
                        BarChartData(
                          borderData: FlBorderData(show: false),

                          gridData: FlGridData(
                            show: true,
                            drawVerticalLine: false,
                            horizontalInterval: 50,
                            getDrawingHorizontalLine: (value) =>
                                FlLine(color: Colors.grey.shade200, strokeWidth: 1),
                          ),

                          titlesData: const FlTitlesData(
                            leftTitles: AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                            rightTitles: AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                            topTitles: AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                            bottomTitles: AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                          ),

                          barGroups: _bars(),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              /// ================= GIG PERFORMANCE =================
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColor.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [

                    const Text(
                      "Gig Performance",
                      style: TextStyle(fontWeight: FontWeight.w700),
                    ),

                    const SizedBox(height: 14),

                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [

                        /// PIE CHART
                        Expanded(
                          child: SizedBox(
                            height: 180,
                            child: AspectRatio(
                              aspectRatio: 1,
                              child: PieChart(
                                PieChartData(
                                  centerSpaceRadius: 40,
                                  sectionsSpace: 2,
                                  sections: _pie(),
                                ),
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(width: 10),

                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              _Legend(color: Colors.green, text: "Completed"),
                              _Legend(color: Colors.orange, text: "Pending"),
                              _Legend(color: Colors.red, text: "Cancelled"),
                              _Legend(color: Colors.blue, text: "In Progress"),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              /// ================= INSIGHTS =================
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColor.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Insights",
                      style: TextStyle(fontWeight: FontWeight.w700),
                    ),
                    SizedBox(height: 10),
                    Text("• Earnings increased by 18% this week"),
                    SizedBox(height: 6),
                    Text("• Most jobs come from repeat clients"),
                    SizedBox(height: 6),
                    Text("• Peak time: 10AM - 2PM"),
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

  /// ================= KPI =================
  Widget _kpi(String title, String value, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColor.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppColor.accent, size: 20),
          const SizedBox(height: 10),
          Text(
            value,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 4),
          Text(
            title,
            style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
          ),
        ],
      ),
    );
  }

  /// ================= BAR DATA =================
  List<BarChartGroupData> _bars() {
    final values = earningsData[selected]!;

    return List.generate(values.length, (i) {
      return BarChartGroupData(
        x: i,
        barRods: [
          BarChartRodData(
            toY: values[i],
            width: 20,
            borderRadius: BorderRadius.circular(6),
            color: AppColor.accent,
          ),
        ],
      );
    });
  }

  /// ================= PIE DATA =================
  List<PieChartSectionData> _pie() {
    return [
      PieChartSectionData(value: 40, color: Colors.green, radius: 45),
      PieChartSectionData(value: 25, color: Colors.orange, radius: 45),
      PieChartSectionData(value: 20, color: Colors.red, radius: 45),
      PieChartSectionData(value: 15, color: Colors.blue, radius: 45),
    ];
  }
}

/// ================= LEGEND =================
class _Legend extends StatelessWidget {
  final Color color;
  final String text;

  const _Legend({required this.color, required this.text});

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
          Text(text, style: const TextStyle(fontSize: 12)),
        ],
      ),
    );
  }
}