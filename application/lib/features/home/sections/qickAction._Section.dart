import 'package:application/core/color.dart';
import 'package:application/core/widgets/sectionTitle.dart';
import 'package:application/features/home/modals/analytics.dart';
import 'package:flutter/material.dart';

class QickActionSection extends StatelessWidget {
  final ValueChanged<int?> onChangeTab;

  const QickActionSection({super.key, required this.onChangeTab});

  @override
  Widget build(BuildContext context) {
    final actions = [
      {
        "name": "search",
        "icon": Icons.search,
        "color": const Color(0xFF0616A7),
        "modal": null,
      },
      {
        "name": "post gig",
        "icon": Icons.add_circle_outlined,
        "color": const Color(0xFF0616A7),
        "modal": const Center(child: Text("data")),
      },
      {
        "name": "scan",
        "icon": Icons.qr_code_scanner_outlined,
        "color": const Color(0xFF06A739),
        "modal": const Center(child: Text("data")),
      },
      {
        "name": "analysis",
        "icon": Icons.bar_chart_rounded,
        "color": const Color(0xFFE08A08),
        "modal": const AnalyticsScreen(),
      },
    ];

    return Container(
      padding: const EdgeInsets.all(1),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              sectionTitle("Qick Action"),
              Text("see all", style: TextStyle(color: AppColor.accent)),
            ],
          ),
          const SizedBox(height: 10),

          LayoutBuilder(
            builder: (context, constraints) {
              const spacing = 7.0;

              // 4 items per row
              final itemWidth = (constraints.maxWidth - (spacing * 3)) / 4;

              return Wrap(
                spacing: spacing,
                runSpacing: spacing,
                children: actions.map((action) {
                  final name = action["name"] as String;
                  final icon = action["icon"] as IconData;
                  final color = action["color"] as Color;
                  final modalScreen = action["modal"] as Widget?;

                  return GestureDetector(
                    onTap: () {
                      if (modalScreen == null) {
                        onChangeTab(1);
                        return;
                      }

                      showGeneralDialog(
                        context: context,
                        pageBuilder: (context, animation, secondaryAnimation) {
                          return Scaffold(
                            appBar: AppBar(
                              backgroundColor: Colors.transparent,
                              elevation: 0,
                            ),
                            body: SafeArea(
                              child: Column(children: [modalScreen]),
                            ),
                          );
                        },
                      );
                    },
                    child: Container(
                      width: itemWidth,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColor.background,
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: const [
                          BoxShadow(
                            color: Color.fromARGB(27, 192, 161, 161),
                            blurRadius: 10,
                          ),
                        ],
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(icon, color: color, size: 30),
                          const SizedBox(height: 10),
                          Text(
                            name,
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontWeight: FontWeight.w700),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              );
            },
          ),
        ],
      ),
    );
  }
}
