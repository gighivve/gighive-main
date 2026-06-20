import 'package:application/core/color.dart';
import 'package:application/core/widgets/sectionTitle.dart';
import 'package:application/features/home/modals/allServices.dart';
import 'package:flutter/material.dart';

class ServicesSection extends StatelessWidget {
  const ServicesSection({super.key});

  @override
  Widget build(BuildContext context) {
    final skills = [
      {
        "name": "Cleaning",
        "icon": Icons.cleaning_services,
        "jobs": 12,
        "color": AppColor.accent,
      },
      {
        "name": "Food Delivery",
        "icon": Icons.delivery_dining,
        "jobs": 28,
        "color": const Color(0xFF22C55E),
      },
      {
        "name": "child Care",
        "icon": Icons.child_care,
        "jobs": 7,
        "color": const Color(0xFFF59E0B),
      },
      {
        "name": "Errands",
        "icon": Icons.shopping_bag,
        "jobs": 15,
        "color": const Color(0xFFEF4444),
      },
    ];

    Widget buildCard(Map<String, dynamic> skill) {
      final name = skill["name"] as String;
      final icon = skill["icon"] as IconData;
      final jobs = skill["jobs"] as int;
      

      return Container(
        height: 110,
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: AppColor.background,
          borderRadius: BorderRadius.circular(10),
          boxShadow: const [
            BoxShadow(color: Color(0x10737272), blurRadius: 10),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(100),
              ),
              child: Icon(
                icon,
                color: AppColor.primaryText
              ),
            ),
            const SizedBox(height: 5),
            Text(
              name.toLowerCase(),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontWeight: FontWeight.w600, 
              fontSize: 14
              ),
            ),
            Text(
              "$jobs done",
              style: const TextStyle(fontSize: 11, color: Color(0x7F000000)),
            ),
          ],
        ),
      );
    }

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            sectionTitle("My Services"),
            GestureDetector(
              onTap: () => showModalBottomSheet(
                backgroundColor: AppColor.background,
                context: context,
                builder: (context) {
                  return const AllservicesModal();
                },
              ),
              child: Text("see all", style: TextStyle(color: AppColor.accent)),
            ),
          ],
        ),
        const SizedBox(height: 10),

        Row(
          children: skills.asMap().entries.map((entry) {
            final skill = entry.value;

            return Expanded(
              child: Padding(
                padding: EdgeInsets.only(
                  left: entry.key == 0 ? 0 : 3.5,
                  right: entry.key == skills.length - 1 ? 0 : 3.5,
                ),
                child: buildCard(skill),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
