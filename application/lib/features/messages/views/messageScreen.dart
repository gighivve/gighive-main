import 'package:flutter/material.dart';

class WalletPage extends StatefulWidget {
  const WalletPage({super.key});

  @override
  State<WalletPage> createState() => _WalletPageState();
}

class _WalletPageState extends State<WalletPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // wallet balance
          Container(
            width: double.infinity,
            height: 150,
            margin: EdgeInsets.all(30),
            padding: EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(),
              borderRadius: BorderRadius.circular(8),
              
            ),
            child:Column(
              children: [
                Row(),
                Column(),
                
              ],
            ),
          ),
          // tranction list
          Container(),
          Container(),
        ],
      ),
    );
  }
}