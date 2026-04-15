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

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool isDark = false;

  void toggleTheme() {
    setState(() {
      isDark = !isDark;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,

      // 👇 LIGHT THEME
      theme: ThemeData(
        brightness: Brightness.light,
        fontFamily: "Roboto",
        scaffoldBackgroundColor: const Color.fromARGB(255, 255, 255, 255),
      ),

      // 👇 DARK THEME
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        fontFamily: "Roboto",
        scaffoldBackgroundColor: const Color(0xFF0F172A), // nice dark navy
      ),

      // 👇 SWITCH CONTROL
      themeMode: isDark ? ThemeMode.dark : ThemeMode.light,

      home: SafeArea(
        child: Layout(
          isDark: isDark,
          toggleTheme: toggleTheme,
        ),
      ),
    );
  }
}