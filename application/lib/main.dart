// ignore_for_file: avoid_web_libraries_in_flutter

import 'package:application/page.dart';
import 'package:flutter/material.dart';
// ignore: deprecated_member_use
import 'dart:html' as html;

void main() {
  // remove the HTML loading indicator once Flutter starts
  html.document.getElementById('loading')?.remove();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(fontFamily: "Roboto"),
      home: SafeArea(child: Layout()),
    );
  }
}
