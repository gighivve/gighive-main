import 'package:application/tabs/gigs.dart';
import 'package:application/tabs/home.dart';
import 'package:application/tabs/profile.dart';
import 'package:flutter/material.dart';
import "package:google_nav_bar/google_nav_bar.dart";

class Layout extends StatefulWidget {
  const Layout({super.key});

  @override
  State<Layout> createState() => _Layoutstate();
}

class _Layoutstate extends State<Layout> {
  int currentPage = 0;

  final pages = [
    const HomePage(),
    // GigsPage(),
    const Center(child: Text("1")),
    const Center(child: Text("2")),
    ProfilePage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(title: const Text("my app")),
      // backgroundColor: const Color.fromARGB(255, 250, 249, 249),
      body: pages[currentPage],
      bottomNavigationBar: Container(
        padding: EdgeInsets.all(15),
        child: GNav(
          backgroundColor: Colors.transparent,
          rippleColor: const Color.fromARGB(255, 35, 3, 150),
          color: Colors.grey,
          activeColor: Colors.white,
          tabBackgroundColor: const Color.fromARGB(255, 35, 3, 150),
          selectedIndex: currentPage,
          padding: EdgeInsets.all(15),
          gap: 8,
          onTabChange: (index) {
            setState(() {
              currentPage = index;
            });
          },
          tabs: [
            GButton(icon: Icons.home, text: "home"),
            GButton(icon: Icons.build_rounded, text: "gigs"),
            GButton(icon: Icons.receipt_long_outlined, text: "work history"),
            GButton(icon: Icons.settings_sharp, text: "setting"),
          ],
        ),
      ),
    );
  }
}
