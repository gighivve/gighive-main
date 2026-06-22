import 'package:application/core/color.dart';
import 'package:flutter/material.dart';


class NotificationScreen extends StatefulWidget {
  const NotificationScreen({super.key});

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  final List<Map<String, dynamic>> notifications = [
    {
      "title": "Withdrawal Successful",
      "subtitle": "₦20,000 has been sent to your bank account",
      "time": "2 min ago",
      "type": "transaction",
      "unread": true,
    },
    {
      "title": "Login Alert",
      "subtitle": "New login from Android device",
      "time": "1 hr ago",
      "type": "security",
      "unread": true,
    },
    {
      "title": "System Update",
      "subtitle": "New features have been added to your app",
      "time": "Yesterday",
      "type": "system",
      "unread": false,
    },
    {
      "title": "Deposit Received",
      "subtitle": "₦50,000 credited to wallet",
      "time": "2 days ago",
      "type": "transaction",
      "unread": false,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: AppColor.background,
      appBar: AppBar(
       
        title: const Text(
          "Notifications",
          style: TextStyle(
            color: AppColor.primaryText,
            fontWeight: FontWeight.w700,
          ),
        ),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          /// HEADER INFO
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColor.surface,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: const Row(
              children: [
                Icon(
                  Icons.notifications_active,
                  color: AppColor.accent,
                ),
                SizedBox(width: 10),
                Expanded(
                  child: Text(
                    "Stay updated with your account activity",
                    style: TextStyle(
                      fontSize: 13,
                      color: AppColor.primaryText,
                    ),
                  ),
                )
              ],
            ),
          ),

          const SizedBox(height: 20),

          /// LIST
          ...notifications.map((item) => _notificationCard(item)),
        ],
      ),
    );
  }

  Widget _notificationCard(Map<String, dynamic> item) {
    final bool unread = item["unread"] == true;

    Color typeColor;
    IconData icon;

    switch (item["type"]) {
      case "transaction":
        typeColor = AppColor.accent;
        icon = Icons.swap_horiz;
        break;
      case "security":
        typeColor = Colors.redAccent;
        icon = Icons.lock;
        break;
      default:
        typeColor = Colors.grey;
        icon = Icons.system_update;
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColor.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: unread
              ? AppColor.accent.withOpacity(.3)
              : Colors.grey.shade200,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// ICON
          Container(
            height: 42,
            width: 42,
            decoration: BoxDecoration(
              color: typeColor.withOpacity(.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: typeColor, size: 20),
          ),

          const SizedBox(width: 12),

          /// CONTENT
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        item["title"],
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight:
                              unread ? FontWeight.w700 : FontWeight.w600,
                          color: AppColor.primaryText,
                        ),
                      ),
                    ),
                    if (unread)
                      Container(
                        height: 8,
                        width: 8,
                        decoration: BoxDecoration(
                          color: AppColor.accent,
                          shape: BoxShape.circle,
                        ),
                      ),
                  ],
                ),

                const SizedBox(height: 4),

                Text(
                  item["subtitle"],
                  style: const TextStyle(
                    fontSize: 12.5,
                    color: AppColor.primaryText,
                  ),
                ),

                const SizedBox(height: 8),

                Text(
                  item["time"],
                  style: TextStyle(
                    fontSize: 11,
                    color: Colors.grey.shade500,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}