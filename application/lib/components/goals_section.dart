import 'package:flutter/material.dart';

class GoalsSection extends StatelessWidget {
  const GoalsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        goal("Earnings Goal", 85, 100),
        goal("Active Hours", 6, 8),
      ],
    );
  }

  Widget goal(String title, double current, double total) {
    return ListTile(
      title: Text(title),
      subtitle: LinearProgressIndicator(value: current / total),
      trailing: Text("$current / $total"),
    );
  }
}