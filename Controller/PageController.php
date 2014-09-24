<?php

namespace Brix\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use JMS\Serializer\SerializationContext;

use Brix\CoreBundle\Entity\Page;
use Brix\CoreBundle\Forms\PageForm;

class PageController extends Controller
{


    public function newPageAction($url = null){
        return $this->render('BrixAdminBundle:Default:createPage.html.twig',array('url'=>$url,"page"=>null));
    }

    public function getPageTreeAction(){
        $em = $this->getDoctrine()->getManager();
        if($pages = $em->getRepository('BrixCoreBundle:Page')->findBy(array('parent'=>null,'original'=>null))){
            $serializer = $this->get('jms_serializer');
            $data = $serializer->serialize($pages,'json',SerializationContext::create()->setGroups(array('list')));
        } else{
            $data = Array();
        }
        return new Response($data,200, array('Content-Type' => 'application/json'));
    }

    public function getLanguagesAction(){
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository('BrixCoreBundle:Language');
        $serializer = $this->get('jms_serializer');
        $languages = $repo->findAll();
        $data = $serializer->serialize($languages,'json');
        return new Response($data,200, array('Content-Type' => 'application/json'));
    }

    public function getTranslationsAction($id){
        $em = $this->getDoctrine()->getManager();
        $serializer = $this->get('jms_serializer');
        $repo = $em->getRepository('BrixCoreBundle:Page');

        if($page = $repo->find($id)){
            $qb = $repo->createQueryBuilder('p')
            -> where('p.original = :original')
            ->orWhere('p.original = :page')
            ->orWhere('p.id = :original')
            ->andWhere('p.id != :page')
            ->setParameter('page',$page)
            ->setParameter('original',$page->getOriginal())
            ;

            $query = $qb->getQuery();
            $qpages = $query->getResult();

            $pages = Array();
            foreach($qpages as $page){
                $pages[] = $page;
            }


        } else{
            $pages = Array();
        }
        $data = $serializer->serialize($pages,'json',SerializationContext::create()->setGroups(array('list')));

        return new Response($data,200, array('Content-Type' => 'application/json'));
    }

    public function getPageAction($id){
        $em = $this->getDoctrine()->getManager();
        if($page = $em->getRepository('BrixCoreBundle:Page')->find($id)){
            $serializer = $this->get('jms_serializer');
            $data = $serializer->serialize($page,'json',SerializationContext::create()->setGroups(array('details')));
        } else{
            $data = Array();
        }
        return new Response($data,200, array('Content-Type' => 'application/json'));

    }


    public function getPageTypesAction(){
        $em = $this->getDoctrine()->getManager();

        $types = $em->getRepository('BrixCoreBundle:PageType')->findAll();

        $serializer = $this->get('jms_serializer');
        $data = $serializer->serialize($types,'json');

        return new Response($data,200, array('Content-Type' => 'application/json'));
    }


    public function setPageAction($id, Request $request){


        $em = $this->getDoctrine()->getManager();

        if(!$page = $em->getRepository("BrixCoreBundle:Page")->find($id)){
            $page = new Page();
        }


        $serializer = $this->get('jms_serializer');
        $formClass = $this->getForm();

        $form = $this->createForm($formClass,$page);

        $json_data = json_decode($request->getContent(),true);//get the response data
        $form->bind($json_data);

        if ($form->isValid()) {

            $page = $form->getData();
            $em->persist($page);
            $em->flush();

            $data = $serializer->serialize($page,'json');

        } else{

            $data = $serializer->serialize($form,'json');
        }

        return new Response($data,200, array('Content-Type' => 'application/json'));
    }



    private function getForm(){
        return new PageForm();
    }

}
