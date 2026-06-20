import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

class TransactionCard extends StatelessWidget {
  final Map<String, dynamic> txn;

  const TransactionCard({super.key, required this.txn});

  @override
  Widget build(BuildContext context) {
    final String title = txn['title'];
    final String subtitle = txn['subtitle'];
    final String status = txn['status'];
    final String type = txn['type'];
    final double amount = txn['amount'];
    final String date = txn['date'];
    final String client = txn['client'];
    final String category = txn['category'];

    final bool isIncome = type == "income";

    final Color statusColor = _getStatusColor(status);
    final IconData icon = _getCategoryIcon(category);

    return GestureDetector(
      onTap: () => showGeneralDialog(
        context: context,
        pageBuilder: (context, _, _) {
          return Scaffold(body: Center(child: Text("data")));
        },
      ),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Theme.of(context).primaryColor,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: Colors.grey.shade100),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 14,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        child: Row(
          children: [
            /// ICON
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: statusColor.withOpacity(0.12),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: statusColor, size: 20),
            ),

            const SizedBox(width: 12),

            /// DETAILS
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  /// TITLE
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppColor.primaryText,
                    ),
                  ),

                  const SizedBox(height: 4),

                  /// SUBTITLE
                  Text(
                    subtitle,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 12,
                      color: AppColor.primaryText.withOpacity(0.6),
                    ),
                  ),

                  const SizedBox(height: 6),

                  /// CLIENT + DATE
                  Row(
                    children: [
                      Text(
                        client,
                        style: TextStyle(
                          fontSize: 11,
                          color: AppColor.primaryText.withOpacity(0.5),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        "•",
                        style: TextStyle(
                          color: AppColor.primaryText.withOpacity(0.4),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        _formatDate(date),
                        style: TextStyle(
                          fontSize: 11,
                          color: AppColor.primaryText.withOpacity(0.5),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            /// RIGHT SIDE
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                /// AMOUNT
                Text(
                  "${isIncome ? '+' : '-'}₦${amount.toStringAsFixed(0)}",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                    color: isIncome
                        ? const Color(0xFF22C55E)
                        : const Color(0xFFEF4444),
                  ),
                ),

                const SizedBox(height: 6),

                /// STATUS BADGE
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    status,
                    style: TextStyle(
                      fontSize: 10,
                      color: statusColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  /// ================= HELPERS =================

  Color _getStatusColor(String status) {
    switch (status) {
      case "Completed":
        return const Color(0xFF22C55E);
      case "Pending":
        return const Color(0xFFF59E0B);
      default:
        return const Color(0xFFEF4444);
    }
  }

  IconData _getCategoryIcon(String category) {
    switch (category) {
      case "Cleaning":
        return Icons.cleaning_services;
      case "Barbing":
        return Icons.content_cut;
      case "Laundry":
        return Icons.local_laundry_service;
      case "Errand":
        return Icons.shopping_bag;
      case "Repair":
        return Icons.build;
      default:
        return Icons.work_outline;
    }
  }

  String _formatDate(String rawDate) {
    final date = DateTime.parse(rawDate);
    return "${date.day}/${date.month}/${date.year}";
  }
}
