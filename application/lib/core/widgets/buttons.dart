import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

class BackButtons extends StatelessWidget {
  const BackButtons({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pop(context),
      child: Container(
        padding: EdgeInsets.all(15),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(Icons.arrow_back_rounded, color: AppColor.primaryText),
            Text("back", style: TextStyle(color: AppColor.primaryText)),
          ],
        ),
      ),
    );
  }
}
