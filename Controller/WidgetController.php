<?php

namespace Brix\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Brix\CoreBundle\Entity\Widget;
use Brix\CoreBundle\Forms\WidgetForm;

class WidgetController extends Controller
{

  public function getTemplateAction($id){

    $em = $this->getDoctrine()->getManager();
    if($widget = $em->getRepository("BrixCoreBundle:WidgetType")->find($id)){
      return $this->render($widget->getTemplate(),array('widget'=>null,'entity'=>null));
    }
    return new Response("",404, array('Content-Type' => 'application/json'));
  }


  public function getWidgetAction($id)
  {

    $em = $this->getDoctrine()->getManager();
    if($widget = $em->getRepository("BrixCoreBundle:Widget")->find($id)){
      $serializer = $this->get('jms_serializer');
      $data = $serializer->serialize($widget,'json');
    } else{
      $data = new Widget();
    }
    return new Response($data,200, array('Content-Type' => 'application/json'));
  }


  public function setWidgetAction($id = null, Request $request){
    $em = $this->getDoctrine()->getManager();

    if($id){
      $widget = $em->getRepository("BrixCoreBundle:Widget")->find($id);
    } else {
      $widget = new Widget();
    }

    $form = $this->getForm($widget);

    $serializer = $this->get('jms_serializer');

    $form->bind($request);

    if ($form->isValid()) {
      $widget = $form->getData();
      $em->persist($widget);
      $em->flush();

      $data = $serializer->serialize($widget,'json');
    } else{

      $data = $serializer->serialize($form,'json');
    }

    return new Response($data,200, array('Content-Type' => 'application/json'));
  }

  public function getForm($widget){
    return $this->createForm(new WidgetForm(),$widget);
  }

  public function getEntityAction($id){

    $em = $this->getDoctrine()->getManager();

    $widget = $em->getRepository("BrixCoreBundle:Widget")->find($id);
    $widgetType = $widget->getType();



    if($widget->getEntity() && $entity = $em->getRepository($widgetType->getModel())->find($widget->getEntity())){
      $widget->data = $entity;
    }else{
      $entityRepository = $em->getRepository($widgetType->getModel());
      $classname = $entityRepository->getClassName();
      $entity = new $classname();
      $widget->data = $entity;
    }
    $serializer = $this->get('jms_serializer');
    $data = $serializer->serialize($entity,'json');
    return new Response($data,200, array('Content-Type' => 'application/json'));
  }


  public function setEntityAction($id, Request $request){

    $em = $this->getDoctrine()->getManager();

    $widget = $em->getRepository("BrixCoreBundle:Widget")->find($id);
    $widgetType = $widget->getType();

    $entityRepository = $em->getRepository($widgetType->getModel());

    if($widget->getEntity()){
      $entity = $entityRepository->find($widget->getEntity());
    } else {
      $classname = $entityRepository->getClassName();
      $entity = new $classname();

    }
    $serializer = $this->get('jms_serializer');


    $formClass = $entity->getForm();

    $form = $this->createForm($formClass,$entity);
    $json_data = json_decode($request->getContent(),true);//get the response data
    $form->bind($json_data);

    if ($form->isValid()) {

      $entity = $form->getData();
      $em->persist($entity);
      $em->flush();
      $widget->setEntity($entity->getId());
      $em->persist($widget);
      $em->flush();


      $data = $serializer->serialize($entity,'json');
    } else{

      $data = $serializer->serialize($form,'json');
    }

    return new Response($data,200, array('Content-Type' => 'application/json'));
  }
}
