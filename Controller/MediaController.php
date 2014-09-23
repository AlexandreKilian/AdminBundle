<?php

namespace Brix\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Brix\CoreBundle\Entity\Media;

class MediaController extends Controller
{
    public function getAction()
    {
        return array(
                // ...
            );    }

    public function uploadAction(Request $request)
    {

      $em = $this->getDoctrine()->getManager();

      $multiple = false;
      $medias = Array();
      $media;
      if(sizeof($request->files)>1){
        $multiple = true;
      }
      foreach($request->files as $file){
        $media = new Media();
        $media->setSource(sha1(md5(time())) .'.'. $file->guessExtension());
        if($savedFile = $file->move($media->getUploadRootDir(),$media->getSource())){
          $em->persist($media);
          $medias[] = $media;
        }
      }
      $em->flush();

      $serializer = $this->get('jms_serializer');
      if($multiple){
        $data = $serializer->serialize($medias,'json');
      } else {
        $data = $serializer->serialize($media,'json');
      }
      return new Response($data,200, array('Content-Type' => 'application/json'));
    }

}
