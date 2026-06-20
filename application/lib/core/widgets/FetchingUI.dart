import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

class FetchUI extends StatelessWidget {
  final String snaphot;
  const FetchUI({super.key, required this.snaphot})
    : assert(snaphot == "loading" || snaphot == "error");

  @override
  Widget build(BuildContext context) {
    if (snaphot == "loading") {
      return Container(
        padding: EdgeInsets.all(10),
        child: Center(child: CircularProgressIndicator(color: AppColor.accent)),
      );
    }
    return Center(
      child: Column(
        children: [
          Text(" error occured", style: TextStyle(color: AppColor.primaryText)),
        ],
      ),
    );
  }
}
