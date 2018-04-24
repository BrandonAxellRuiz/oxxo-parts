<?php 


$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://fcm.googleapis.com/fcm/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"registration_ids\":[\"fl8SO5Mxl4w:APA91bH2YIQ1tK5f5OJHUyuFtU3UYafbevSvAZd9j0E2IYarnNEmLeQDVXIrWVUzaCdiq4OdQMBv9j5TKFSFhSpy28uR53AeVy0wSZdfmzxm8ymJHK25CN8sumyBKCx2dZSy4WSph-4p\"]}",
  CURLOPT_HTTPHEADER => array(
    "authorization: key=AAAAut07DpQ:APA91bGLvRyLtFRTahYcuLk1f89rSQqvztqPl-TU7p8x0Y5kO24F9Jt4L5fkzDwn2PDhLQh6FTmGmlHh1i4t4lS63XXbWf_jEe6Tk9fp-CPofAjeJR2MH3N-NC2IET-TpXzIM_sCpmTN",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}

?>