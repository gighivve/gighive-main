import 'package:flutter/material.dart';

class WalletCard extends StatelessWidget {
  const WalletCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: const Icon(Icons.wallet),
        title: const Text("Available for Payout"),
        subtitle: const Text("₦420.00"),
        trailing: ElevatedButton(
          onPressed: () {},
          child: const Text("Withdraw"),
        ),
      ),
    );
  }
}