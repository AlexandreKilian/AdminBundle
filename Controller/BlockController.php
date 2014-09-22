<?php

namespace Brix\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Brix\CoreBundle\Entity\Widget;
use Brix\CoreBundle\Forms\WidgetForm;
use Brix\CoreBundle\Forms\BlockForm;

class BlockController extends Controller
{
  public function getBlockAction($id){
    $em = $this->getDoctrine()->getManager();

    $block = $em->getRepository("BrixCoreBundle:Block")->find($id);
    $serializer = $this->get('jms_serializer');
    $data = $serializer->serialize($block,'json');
    return new Response($data,200, array('Content-Type' => 'application/json'));
  }


  public function getTypesAction($id){
    //TODO: Selective Widget Types for each Block;

    $em = $this->getDoctrine()->getManager();

    $types = $em->getRepository("BrixCoreBundle:WidgetType")->findAll();

    $serializer = $this->get('jms_serializer');
    $data = $serializer->serialize($types,'json');
    return new Response($data,200, array('Content-Type' => 'application/json'));
  }


  public function setBlockAction(Request $request, $id){
    $em = $this->getDoctrine()->getManager();


    $block = $em->getRepository('BrixCoreBundle:Block')->find($id);

    $serializer = $this->get('jms_serializer');

    $children = json_decode($request->getContent(),true);

    foreach($children as $child){
      if($child['element_type']=='widget'){
        $entity = $em->getRepository('BrixCoreBundle:Widget')->find($child['id']);
        unset($child['element_type']);
        unset($child['id']);
        $formClass = new WidgetForm();
      } else {
        // $form = new BlockForm();
      }
      $form = $this->createForm($formClass,$entity);
      $form->bind($child);


      if ($form->isValid()) {

        $entity = $form->getData();
        $entity->setBlock($block);
        $em->persist($entity);
      }
    }
    $data = $serializer->serialize($id,'json');
    $em->flush();
    return new Response($data,200, array('Content-Type' => 'application/json'));


  }


  public function addWidgetAction(Request $request, $id){


    $json_data = json_decode($request->getContent());//get the response data


    $em = $this->getDoctrine()->getManager();

    $block = $em->getRepository("BrixCoreBundle:Block")->find($id);
    $type = $em->getRepository("BrixCoreBundle:WidgetType")->find($json_data->type);

    $widget = new Widget();
    $widget->setBlock($block);
    $widget->setType($type);
    $widget->setOrder(sizeof($block->getChildren()));

    $em->persist($widget);
    $em->flush();

    $serializer = $this->get('jms_serializer');
    $data = $serializer->serialize($widget,'json');
    return new Response($data,200, array('Content-Type' => 'application/json'));

  }

  public function removeWidgetAction(Request $request, $id){
    $em = $this->getDoctrine()->getManager();

    $block = $em->getRepository("BrixCoreBundle:Block")->find($id);

    $child = json_decode($request->getContent(),true);
    $entity = array('success'=>true);
    if($child['element_type']=='widget'){
      $entity = $em->getRepository('BrixCoreBundle:Widget')->find($child['id']);
      $em->remove($entity);
      $em->flush();
    }

    $serializer = $this->get('jms_serializer');
    $data = $serializer->serialize($entity,'json');
    return new Response($data,200, array('Content-Type' => 'application/json'));

  }

}
