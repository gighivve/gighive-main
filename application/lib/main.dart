import 'package:application/core/color.dart';
import 'package:application/page.dart';
import 'package:application/src/web_loader.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      statusBarBrightness: Brightness.light,
    ),
  );
  removeLoadingIndicator();
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
        primaryColor: AppColor.background,
        scaffoldBackgroundColor: AppColor.background,

        textTheme: ThemeData.light().textTheme.apply(
          bodyColor: AppColor.primaryText,
          displayColor: AppColor.primaryText,
        ),
        primaryTextTheme: ThemeData.light().textTheme.apply(
          bodyColor: AppColor.primaryText,
          displayColor: AppColor.primaryText,
        ),
      ),

      // 👇 DARK THEME
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        fontFamily: "Roboto",
        primaryColor: AppColor.background,
        scaffoldBackgroundColor: const Color(0xFF0F172A), // nice dark navy
      ),

      // 👇 SWITCH CONTROL
      themeMode: isDark ? ThemeMode.dark : ThemeMode.light,

      home: Layout(isDark: isDark, toggleTheme: toggleTheme),
    );
  }
}
