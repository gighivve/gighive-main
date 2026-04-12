import 'package:flutter/material.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final List<Map<String, dynamic>> settings = [
    {
      "title": "services",
      "options": [
        {"name": "skills & experticse"},
      ],
    },
    {
      "title": "services",
      "options": [
        {"name": "skills & experticse"},
      ],
    },
    // {"name": "sill & expertise"},
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Stack(
            children: [
              Container(
                padding: EdgeInsets.all(20),
                child: Row(
                  children: [
                    Icon(Icons.person, size: 100),
                    Column(
                      children: [
                        Text("chukwuemeka emmanuel ekine"),
                        Text("chukwuemekacodev@gmail.com"),
                        Text("last updated at: 12/03/2026"),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          Column(
            children: [
              ListView.builder(
                itemCount: settings.length,
                itemBuilder: (context, index) {
                  return Container(
                    padding: EdgeInsets.all(10),
                    child: Row(children: [Text(settings[index]["title"] as String)]),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}
