import 'package:application/tabs/home.dart';
import 'package:application/tabs/profile.dart';
import 'package:flutter/material.dart';
import "package:google_nav_bar/google_nav_bar.dart";

class Layout extends StatefulWidget {
  final bool isDark;
  final VoidCallback toggleTheme;

  const Layout({
    super.key,
    required this.isDark,
    required this.toggleTheme,
  });

  @override
  State<Layout> createState() => _Layoutstate();
}

class _Layoutstate extends State<Layout> {
  int currentPage = 0;

  late final List<Widget> pages;

  @override
  void initState() {
    super.initState();

    pages = [
      HomeScreen(
        isDark: widget.isDark,
        toggleTheme: widget.toggleTheme,
      ),

      /// 🔍 DISCOVER (FIND JOBS)
      const Center(child: Text("Discover Jobs")),

      /// 💼 MY GIGS (ACTIVE WORK)
      const Center(child: Text("My Gigs")),

      /// 💬 MESSAGES
      const Center(child: Text("Messages")),

      /// 👤 PROFILE
      const ProfilePage(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[currentPage],

      /// 🔥 FLOATING NAVBAR
      bottomNavigationBar: Container(
        margin: const EdgeInsets.all(16),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        decoration: BoxDecoration(
          color: widget.isDark
              ? const Color(0xFF0F172A)
              : Colors.white,
          borderRadius: BorderRadius.circular(30),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 20,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: GNav(
          backgroundColor: Colors.transparent,

          /// COLORS
          rippleColor: Colors.transparent,
          hoverColor: Colors.transparent,
          color: Colors.grey.shade500,
          activeColor: Colors.white,

          tabBackgroundColor: const Color(0xFF4F46E5), // brand indigo

          selectedIndex: currentPage,
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          gap: 6,

          onTabChange: (index) {
            setState(() {
              currentPage = index;
            });
          },

          tabs: const [

            /// HOME
            GButton(
              icon: Icons.home_rounded,
              text: "Home",
            ),

            /// DISCOVER
            GButton(
              icon: Icons.explore_rounded,
              text: "Discover",
            ),

            /// MY GIGS
            GButton(
              icon: Icons.work_rounded,
              text: "Gigs",
            ),

            /// MESSAGES
            GButton(
              icon: Icons.chat_bubble_outline,
              text: "Messages",
            ),

            /// PROFILE
            GButton(
              icon: Icons.person_rounded,
              text: "Profile",
            ),
          ],
        ),
      ),
    );
  }
}