import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

Widget avaterImage(String url, String name) {
  // Handle invalid or empty URLs
  final isValidUrl =
      url.isNotEmpty &&
      (url.startsWith('http://') || url.startsWith('https://'));

  return Container(
    padding: EdgeInsets.all(10),
    child: CircleAvatar(
      radius: 22,
      backgroundColor: AppColor.accent,
      backgroundImage: isValidUrl ? NetworkImage(url) : null,
      child: Text(
        name.isNotEmpty ? name[0] : '?',
        style: TextStyle(
          fontWeight: FontWeight.w700,
          color: AppColor.onAccent,
          fontSize: 18,
        ),
      ),
    ),
  );
}
