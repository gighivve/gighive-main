import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

class WalletCard extends StatelessWidget {
  const WalletCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      color: AppColor.surface,
      child: ListTile(
        leading: Icon(Icons.wallet, color: AppColor.accent),
        title: const Text("Available for Payout"),
        subtitle: const Text("₦420.00"),
        trailing: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColor.accent,
            foregroundColor: AppColor.onAccent,
          ),
          onPressed: () {},
          child: const Text("Withdraw"),
        ),
      ),
    );
  }
}
