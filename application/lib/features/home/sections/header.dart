import 'package:application/core/color.dart';
import 'package:application/core/widgets/avaterImage.dart';
import 'package:application/features/home/modals/notification.dart';
import 'package:flutter/material.dart';

class HomeHeader extends StatefulWidget {
  const HomeHeader({super.key});

  @override
  State<HomeHeader> createState() => _HomeHeaderState();
}

class _HomeHeaderState extends State<HomeHeader> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(0),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// AVATAR + TEXT
              Row(
                children: [
                  avaterImage("https://i.pravatar.cc/150?img=1", "chukwuemeka"),
                  const SizedBox(width: 2),

                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Ekine Chukwuemeka emmanuel",
                        style: TextStyle(
                          color: AppColor.primaryText,
                          fontSize: 14,
                          letterSpacing: 0.2,
                          fontWeight: FontWeight.w700,
                        ),
                      ),

                      /// LOCATION
                      Text(
                        "paul osi, Lagos, Nigeria",
                        style: TextStyle(
                          color: AppColor.primaryText,
                          fontSize: 12.5,
                        ),
                      ),
                    ],
                  ),
                ],
              ),

              /// ACTION ICONS
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  foregroundColor: Colors.white,
                  backgroundColor: AppColor.background.withOpacity(0.24),
                  padding: EdgeInsets.symmetric(vertical: 20),
                  elevation: 10,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                onPressed: () {
                  showGeneralDialog(
                    context: context,
                    pageBuilder: (context, animation, secondaryAnimation) {
                      return NotificationScreen();
                    },
                  );
                },
                child: Stack(
                  children: [
                    Icon(Icons.notifications_none, color: AppColor.primaryText),

                    Positioned(
                      right: 0,
                      top: 0,
                      child: Container(
                        width: 8,
                        height: 8,
                        decoration: const BoxDecoration(
                          color: Colors.red,
                          shape: BoxShape.circle,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 18),
        ],
      ),
    );
  }
}
