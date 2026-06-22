import 'package:application/core/widgets/FetchingUI.dart';
import 'package:application/features/home/services/homeApi.dart';
import 'package:flutter/material.dart';

class AllservicesModal extends StatefulWidget {
  const AllservicesModal({super.key});

  @override
  State<AllservicesModal> createState() => _AllservicesModalState();
}

class _AllservicesModalState extends State<AllservicesModal> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(10),
      child: Column(
        children: [
          SingleChildScrollView(
            child: FutureBuilder(
              future: getServices(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) return FetchUI(snaphot: "loading");
                if (snapshot.hasError) return FetchUI(snaphot: "error");
                final data = snapshot.data!;
                return Column(
                  children: data.map((service) {
                    return Container(
                      padding: EdgeInsets.all(20),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(service["title"]),
                          Text(service["jobs_done"].toString()),
                        ],
                      ),
                    );
                  }).toList(),
                );
              },
            ),
          ),

          SizedBox(height: 70,
          child: Row(
            children: [
              
            ],
          ),)
        ],
      ),
    );
  }
}
