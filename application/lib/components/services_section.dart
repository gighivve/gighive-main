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
        "color": const Color(0xFF4F46E5),
      },
      {
        "name": "Food Delivery",
        "icon": Icons.delivery_dining,
        "jobs": 28,
        "color": const Color(0xFF22C55E),
      },
      {
        "name": "Child Care",
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

    return Wrap(
      spacing: 14,
      runSpacing: 14,
      children: skills.map((skill) {
        final name = skill["name"] as String;
        final icon = skill["icon"] as IconData;
        final jobs = skill["jobs"] as int;
        final color = skill["color"] as Color;

        return Container(
          width: (MediaQuery.of(context).size.width / 2) - 24,
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: Colors.grey.shade100),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 14,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [

              /// ICON
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: color, size: 22),
              ),

              const SizedBox(height: 12),

              /// NAME
              Text(
                name,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF0F172A),
                ),
              ),

              const SizedBox(height: 6),

              /// JOBS + STATUS
              Row(
                children: [

                  Text(
                    "$jobs jobs done",
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey.shade600,
                    ),
                  ),

                  const Spacer(),

                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: color.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      "Active",
                      style: TextStyle(
                        fontSize: 10,
                        color: color,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}