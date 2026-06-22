import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

class TransactionDetails extends StatelessWidget {
  final double amount;
  final String status;
  final dynamic colors;
 

  const TransactionDetails({
    super.key,
    required this.amount,
    required this.status,
    required this.colors,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Transaction Details", style: TextStyle(fontSize: 15)),
        titleSpacing: 90,
      ),
      body: SafeArea(
        child: Column(
          children: [
            // the transaction amount
            Padding(
              padding: EdgeInsets.all(10),
              child: Container(
                padding: EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: (colors as Color).withAlpha(30),
                  borderRadius: BorderRadius.circular(100),
                ),
                child: Column(
                  children: [
                    Icon(
                      status == "successful"
                          ? Icons.check_circle
                          : status == "failed" || status == "cancelled"
                          ? Icons.cancel
                          : Icons.watch_later_outlined,
                      size: 50,
                      color: colors,
                    ),
                  ],
                ),
              ),
            ),

            Text(status),

            // the details information
            Padding(
              padding: EdgeInsets.all(10),
              child: Text(
                "₦${amount.toStringAsFixed(0000)}",
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: AppColor.primaryText,
                ),
              ),
            ),

            Expanded(
              child: Container(
                padding: EdgeInsets.all(10),
                child: Center(child: Text("details")),
              ),
            ),
            // the action button
            SizedBox(
              height: 50,
              child: Center(
                child: Container(
                  width: 400,
                  padding: EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppColor.accent,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    spacing: 20,
                    children: [
                      Icon(Icons.share, color: AppColor.secondaryText),
                      Text(
                        "share Receipt",
                        style: TextStyle(color: AppColor.secondaryText),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
