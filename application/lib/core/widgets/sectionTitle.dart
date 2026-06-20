import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

Widget sectionTitle(String title) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 10),
    child: Align(
      alignment: Alignment.centerLeft,
      child: Text(
        title.toLowerCase(),
        style: TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.bold,
          color: AppColor.primaryText,
        ),
      ),
    ),
  );
}
